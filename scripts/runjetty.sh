#!/bin/bash
cp ~/github/twnode/java/jetty/bin/*.class ~/Jetty/webapps/jetty/WEB-INF/classes
cp ~/github/twnode/java/jetty/web.xml ~/Jetty/webapps/jetty/WEB-INF
cd ~/Jetty
java -jar start.jar
