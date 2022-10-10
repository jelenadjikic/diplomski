1. Zookeeper + Kafka installation tutorial: https://medium.com/@shaaslam/installing-apache-kafka-on-windows-495f6f2fd3c8
2. Start Zookeeper service: C:\kafka_2.13-3.2.1\bin\windows> zookeeper-server-start.bat ..\..\config\zookeeper.properties
3. Start Kafka service: C:\kafka_2.13-3.2.1\bin\windows> kafka-server-start.bat ..\..\config\server.properties
4. Create new topic: C:\kafka_2.13-3.2.1\bin\windows> kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic t1