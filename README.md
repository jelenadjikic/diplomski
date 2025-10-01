# Real-Time Product Monitoring System
## Obrada toka podataka korišćenjem Apache Spark platforme

A comprehensive project developed for bachelor's thesis that implements a real-time product monitoring system using Apache Kafka, Apache Spark, and .NET Web API. The system processes product submissions from various sources, performs keyword matching with configurable criteria, and provides a web interface for tracking and monitoring products.

## 🏗️ Architecture Overview

The system consists of three main components:

1. **Kafka Producer** - Reads product submissions from MySQL database and publishes them to Kafka
2. **Spark Streaming Job** - Consumes messages from Kafka, processes them with keyword matching, and stores results
3. **Web API & Frontend** - Provides REST API and web interface for managing keywords and viewing results

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MySQL DB      │    │   Kafka      │    │  Spark Stream   │    │   Web API       │
│  (Submissions)  │───▶│   Topic      │───▶│   Processing    │───▶│  (.NET Core)    │
└─────────────────┘    └──────────────┘    └─────────────────┘    └─────────────────┘
                                                      │                      │
                                                      ▼                      ▼
                                               ┌─────────────────┐    ┌─────────────────┐
                                               │   MySQL DB      │    │   Web Frontend  │
                                               │ (Occurrences)   │    │   (HTML/JS)     │
                                               └─────────────────┘    └─────────────────┘
```

## 🚀 Features

- **Real-time Processing**: Stream processing of product submissions using Apache Spark Streaming
- **Keyword Tracking**: Configurable keyword monitoring with price, location, and engagement filters
- **Web Interface**: Modern responsive web application for managing tracked keywords
- **REST API**: Complete API for keyword management and data retrieval
- **Scalable Architecture**: Built with Apache Kafka for high-throughput message processing
- **Database Integration**: MySQL database for persistent storage

## 🛠️ Technology Stack

### Backend
- **Java 8+** - Core application logic
- **Apache Spark 3.3.0** - Stream processing and data analytics
- **Apache Kafka 2.8.0** - Message streaming platform
- **.NET 6.0** - Web API framework
- **Entity Framework Core** - ORM for database operations

### Frontend
- **HTML5/CSS3** - User interface
- **JavaScript (ES6+)** - Client-side logic
- **Bootstrap 5.2.0** - Responsive UI framework
- **jQuery** - DOM manipulation and AJAX calls

### Database & Infrastructure
- **MySQL 8.0** - Primary database
- **Apache Zookeeper** - Kafka coordination service
- **Maven** - Java dependency management
- **NuGet** - .NET package management

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Java 8 or higher**
- **Apache Kafka 2.13-3.2.1** (or compatible version)
- **Apache Zookeeper**
- **MySQL 8.0+**
- **.NET 6.0 SDK**
- **Maven 3.6+**

## 🔧 Installation & Setup

### 1. Database Setup

Create a MySQL database named `diplomski` and import the required tables:

```sql
CREATE DATABASE diplomski;
USE diplomski;

-- Create submission table (source data)
CREATE TABLE submission (
    id INT PRIMARY KEY,
    authorName VARCHAR(255),
    title VARCHAR(255),
    text TEXT,
    price INT,
    location VARCHAR(255),
    contactNumber VARCHAR(255),
    email VARCHAR(255),
    link VARCHAR(255),
    likes INT,
    dislikes INT,
    datePublished VARCHAR(255)
);

-- Create keyword table (tracked keywords)
CREATE TABLE keyword (
    word VARCHAR(255) PRIMARY KEY,
    lowestPrice INT,
    highestPrice INT,
    location VARCHAR(255),
    minNumOfLikes INT
);

-- Create keywordoccurrence table (matched results)
CREATE TABLE keywordoccurrence (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(255),
    authorName VARCHAR(255),
    title VARCHAR(255),
    text TEXT,
    price INT,
    location VARCHAR(255),
    contactNumber VARCHAR(255),
    email VARCHAR(255),
    link VARCHAR(255),
    likes INT,
    sentiment VARCHAR(255),
    date DATETIME
);
```

### 2. Kafka Setup

Follow the Kafka installation tutorial: [Installing Apache Kafka on Windows](https://medium.com/@shaaslam/installing-apache-kafka-on-windows-495f6f2fd3c8)

Start the services in order:

```bash
# Start Zookeeper
C:\kafka_2.13-3.2.1\bin\windows> zookeeper-server-start.bat ..\..\config\zookeeper.properties

# Start Kafka
C:\kafka_2.13-3.2.1\bin\windows> kafka-server-start.bat ..\..\config\server.properties

# Create topic
C:\kafka_2.13-3.2.1\bin\windows> kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic t1
```

### 3. Application Configuration

Update database connection strings in:
- `KafkaProducer/src/main/java/SubmissionProducer.java` (line 30)
- `DiplomskiWebApi/appsettings.json`

### 4. Build and Run

#### Kafka Producer
```bash
cd KafkaProducer
mvn clean compile
mvn exec:java -Dexec.mainClass="Runner"
```

#### Spark Streaming Job
```bash
cd diplomski
mvn clean compile
mvn exec:java -Dexec.mainClass="diplomski.SparkJob"
```

#### Web API
```bash
cd DiplomskiWebApi
dotnet restore
dotnet run
```

The web application will be available at `http://localhost:5000`

## 📖 Usage

### Web Interface

1. **Track New Product**: Add keywords to monitor with specific criteria (price range, location, minimum likes)
2. **Untrack Product**: Remove keywords from monitoring
3. **View Found Posts**: Browse posts that matched your tracked keywords
4. **Tracked Products**: View all currently monitored keywords
5. **Activity Feed**: See recent matches from the last 24 hours

### API Endpoints

#### Keywords
- `GET /Keyword/GetKeywords` - Retrieve all tracked keywords
- `POST /Keyword/TrackKeyword/{keyword}/{lowPrice}/{highPrice}/{location}/{minLikes}` - Add new keyword
- `DELETE /Keyword/UntrackKeyword/{keyword}` - Remove keyword

#### Keyword Occurrences
- `GET /KeywordOccurrence/GetKeywordOccurrences` - Get all matched posts
- `GET /KeywordOccurrence/GetKeywordOccurrencesByKeyword/{keyword}` - Get matches for specific keyword

## 🔄 Data Flow

1. **Data Ingestion**: Kafka Producer reads submissions from MySQL database
2. **Message Streaming**: Submissions are published to Kafka topic `t1`
3. **Stream Processing**: Spark Streaming consumes messages and performs keyword matching
4. **Keyword Matching**: Each submission is checked against tracked keywords with filters:
   - Text contains keyword
   - Price within specified range
   - Location matches
   - Likes meet minimum threshold
5. **Result Storage**: Matched submissions are saved as keyword occurrences
6. **Web Interface**: Users can view results and manage keywords through the web application

## 🎯 Key Features Explained

### Keyword Matching Algorithm
The system uses substring matching to find keywords within submission text, combined with multi-criteria filtering:

```java
// Example matching criteria
if(strstr(textLower, keyword) > 0 && 
   price >= lowestPrice && 
   price <= highestPrice && 
   location.equals(targetLocation) && 
   likes >= minLikes) {
    // Match found - save occurrence
}
```

### Real-time Processing
- Spark Streaming processes data in 10-second batches
- Kafka ensures reliable message delivery
- MySQL provides persistent storage for both source data and results

### Web Interface Features
- Responsive design with Bootstrap
- Real-time updates using AJAX
- Modal dialogs for better UX
- Activity notifications for recent matches

## 🐛 Troubleshooting

### Common Issues

1. **Kafka Connection Failed**
   - Ensure Zookeeper and Kafka are running
   - Check if topic `t1` exists
   - Verify bootstrap server configuration

2. **Database Connection Issues**
   - Verify MySQL is running
   - Check connection strings in configuration files
   - Ensure database and tables exist

3. **Spark Job Not Processing**
   - Check Kafka consumer configuration
   - Verify topic has messages
   - Review Spark logs for errors

## 📝 Project Structure

```
diplomski-master/
├── diplomski/                    # Spark Streaming application
│   ├── src/main/java/diplomski/
│   │   ├── config/              # Configuration classes
│   │   ├── domain/              # Domain models
│   │   ├── model/               # Data models
│   │   ├── service/             # Business logic
│   │   └── SparkJob.java        # Main Spark application
│   └── pom.xml                  # Maven dependencies
├── DiplomskiWebApi/             # .NET Web API
│   ├── Controllers/             # API controllers
│   ├── Models/                  # Entity models
│   ├── Client/                  # Frontend files
│   └── DiplomskiWebApi.csproj   # Project file
├── KafkaProducer/               # Kafka producer application
│   ├── src/main/java/
│   │   ├── Runner.java          # Main class
│   │   ├── SubmissionProducer.java
│   │   └── SubmissionSerializer.java
│   └── pom.xml
└── README.md
```
