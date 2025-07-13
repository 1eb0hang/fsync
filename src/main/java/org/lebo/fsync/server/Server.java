package org.lebo.fsync.server;

import java.io.*;
import java.net.*;
import java.nio.file.*;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.sun.net.httpserver.*;

public class Server{
	private static final int HTTP_PORT = 8080;
	private static final int DISCOVERY_PORT = 4446;
	private static final String MULTICAST_GROUP = "233.0.0.0";
	private static final Path SHARED_DIR = Paths.get("shared");

	public static void main(String[] args) throws Exception{
		// Start HTTP server
		HttpServer server = HttpsServer.create(new InetSocketAddress(HTTP_PORT), 0);
		server.createContext("/", (exchange)->{
			URI requestedURI = exchange.getRequestURI();
			Path requestedFile = SHARED_DIR.resolve(requestedURI.getPath().substring(1)).normalize();

			if(!requestedFile.startsWith(SHARED_DIR) || 
			!Files.exists(requestedFile) ||
			Files.isDirectory(requestedFile)){
				exchange.sendResponseHeaders(404, -1);
				return;
			}

			Headers headers = exchange.getResponseHeaders();
			headers.add("Content-Type", Files.probeContentType(requestedFile));
			headers.add("Content-Disposition", "attachment; filename=\"" +requestedFile.getFileName() +"\"");
			
			long filelength = Files.size(requestedFile);
			exchange.sendResponseHeaders(200, filelength);

			try(OutputStream os = exchange.getResponseBody()){
				Files.copy(requestedFile, os);
			}
		});

		ExecutorService httpPool = Executors.newFixedThreadPool(4);
		server.setExecutor(httpPool);
		server.start();
		System.out.println("HTTP server started on port "+ HTTP_PORT);


		// Start UDP discovery server
		Thread discoveryThread = new Thread(()->{
			try (MulticastSocket socket = new MulticastSocket(DISCOVERY_PORT)){
				InetAddress group = InetAddress.getByName(MULTICAST_GROUP);
				socket.joinGroup(group);

				byte[] buf = new byte[256];
				System.out.println("Listening for discovery on " + MULTICAST_GROUP + ":"+DISCOVERY_PORT);


				while(true){
					DatagramPacket packet = new DatagramPacket(buf, buf.length);
					socket.receive(packet);
					
					String received = new String(packet.getData(), 0, packet.getLength()).trim();

					if(received.equalsIgnoreCase("DISCOVERY_SERVER")){
						String hostAddress = InetAddress.getLocalHost().getHostAddress();
						String response = "SERVER:"+hostAddress+":"+HTTP_PORT;
						byte[] responseBytes = response.getBytes();

						DatagramPacket responsePacket = new DatagramPacket(
							responseBytes, responseBytes.length,
							packet.getAddress(), packet.getPort()
						);
						socket.send(responsePacket);
						System.out.println("Responded to discovery request from "+packet.getAddress());
					}
				}
			}catch(IOException err){
				err.printStackTrace();
			}
		});

		discoveryThread.setDaemon(true);
		discoveryThread.start();
	}


	// private static HttpHandler handleExchange(HttpExchange exchange){
		
	// }
}
