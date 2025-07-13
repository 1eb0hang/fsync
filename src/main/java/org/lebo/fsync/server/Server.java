// package org.lebo.fsync.server;

// import java.io.*;
// import java.net.*;
// import java.nio.file.*;
// import java.util.concurrent.*;
// import com.sun.net.httpserver.*;

// public class Server{
// 	private static final int HTTP_PORT = 8080;
// 	private static final int DISCOVERY_PORT = 4446;
// 	private static final String MULTICAST_GROUP = "230.0.0.0";
// 	private static final Path SHARED_DIR = Paths.get("shared");
	
// 	public static void main(String[] args) throws Exception{
// 		// Start HTTP server
//         final InetSocketAddress inSocket = new InetSocketAddress(HTTP_PORT);
// 		HttpServer httpServer = HttpServer.create(inSocket, 0);
// 		httpServer.createContext("/", exchange -> {
// 			URI requestURI = exchange.getRequestURI();
			
// 			Path requestedFile = SHARED_DIR.resolve(
// 				requestURI.getPath().substring(1)
// 			);

// 			requestedFile = requestedFile.normalize();

// 			if(!requestedFile.startsWith(SHARED_DIR)
// 				|| !Files.exists(requestedFile)
// 				|| Files.isDirectory(requestedFile)){

// 					exchange.sendResponseHeaders(404, -1);
// 					return;
// 			}
			
// 			Headers headers = exchange.getResponseHeaders();
// 			headers.add("Content-Type", Files.probeContentType(requestedFile));
// 			headers.add("Content-Dispaosition", "attatchment; filenam\""
// 						+ requestedFile.getFileName());
			
// 			long fileLength = files.size(requestedFile);
// 			exchange.sendResponseHeaders(200, fileLength);
			
// 			try(OutputStream os = exchange.getResponsebody()){
// 				Files.copy(requestedFile, os);
// 			}
// 		});
		
// 		ExecutorService httpPool = Executors.newFixedThreadPool(4);
// 		httpServer.setExecutor(httpPool);
// 		httpServer.start();
		
// 		System.out.println("HTTP server started on port "+HTTP_PORT);
		
// 		// Start UDP discovery service
// 		Thread discoveryThread = new Thread(()->{
// 			try(MulticastSocket socket = new MulticastSocket(DISCOVERY_PORT)){
// 				InetAddress group = InetAddress.getByName(MULTICAST_GROUP);
// 				socket.joinGroup(group);
			
// 				byte[] bf = new byte[256];
// 				System.out.println("Listening for discovery on" 
// 					+MULTICAST_GROUP+":"+DISCOVERY_PORT);
				
// 				while(true){
// 					DatagramPacket packet = new DatagramPacket(bf, bf.length);
// 					socket.receive(packet);
					
// 					String recieved = new String(
// 						packet.getData(), 0, packet.getLength()).trim();
					
// 					if(recieved.equalsIgnoreCase("DISCOVER_SERVER")){
// 						String hostAddress = InetAddress.getLocalHost()
// 											.getHostAddress();
// 						String response = "SERVER:"+hostAddress+":"+HTTP_PORT;
// 						byte[] responseBytes = response.getBytes();
						
// 						DatagramPacket responsePacket = new DatagramPacket(
// 							responseBytes, responseBytes.length,
// 							packet.getAddress(), packet.getPost()
// 						);
// 						socket.send(responsePacket);
// 						System.out.println(
// 								"Responded to discovery request from "
// 								+packet.getAddress());
// 					}
// 				}
// 			}catch(IOException e){
// 				e.printStackTrace();
// 			}
// 		});
		
// 		discoveryThread.setDaemon(true);
// 		discoveryThread.start();
// 	}
// }