MVN=`command -v mvn`
OBJECTS=``

compile:
	${MVN} clean compile || echo Maven command not found

run_debug:
	${MVN} exec:java -Dexec.mainClass="org.lebo.fsync.App" -X

run: target/classes/org/lebo/fsync/App.class target/classes/org/lebo/fsync/commnd/Commands.class
	cd target/classes && java org.lebo.fsync.App

package:
	${MVN} clean package

target/classes/org/lebo/fsync/App.class:
target/classes/org/lebo/fsync/commnd/Commands.class:
	make compile