package diplomski.service;

import diplomski.domain.Keyword;
import diplomski.model.Submission;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.sql.*;

public class MySQLService {

	public static void main(String[] args) {
		
	}
		
	// vraca sve kljucne reci koje se prate u bazi
	public static Collection<Keyword> getAllKeywordsFromDatabase() {
		
		Collection<Keyword> allKeywords = new ArrayList<>();
		try{  
			Connection con=DriverManager.getConnection("jdbc:Mysql://localhost:3306/diplomski","root","admin");  
			Statement stmt=con.createStatement();  
			ResultSet rs=stmt.executeQuery("select * from keyword");  
			
			while(rs.next())  
			{
				Keyword oneRow=new Keyword(rs.getString(1).toLowerCase(),rs.getInt(2),rs.getInt(3),rs.getString(4),rs.getInt(5));
				allKeywords.add(oneRow);
			}
			con.close();  	
		}
		catch(Exception e)
		{ 
			System.out.println(e);
		}
		return allKeywords;  
	} 
	
	// upisuje pojavljivanje kljucne reci u bazu
	public static void saveKeywordsOccurrence(Submission submission, List<Keyword> keywords) {
	 try{  

		Connection con=DriverManager.getConnection("jdbc:Mysql://localhost:3306/diplomski","root","admin");  
		for(Keyword k : keywords)
		{
			String query="insert into diplomski.keywordoccurrence (word, authorName, title, text, price, location, contactNumber, email, link, likes, sentiment, date)" + " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			preparedStmt.setString (1, k.getWord());
			preparedStmt.setString (2, submission.getAuthorName());
		    preparedStmt.setString (3, submission.getTitle());
			preparedStmt.setString (4, submission.getText());
			preparedStmt.setInt    (5, submission.getPrice());
			preparedStmt.setString (6, submission.getLocation());
			preparedStmt.setString (7, submission.getContactNumber());
			preparedStmt.setString (8, submission.getEmail());
			preparedStmt.setString (9, submission.getLink());
			preparedStmt.setInt    (10, submission.getLikes());
			preparedStmt.setString (11, "positive");
			preparedStmt.setTimestamp(12, new Timestamp(System.currentTimeMillis()));  

		    preparedStmt.execute();
		    
			System.out.println("Keyword occurrence of the word " + k.getWord()+  " added to database!\n\n\n"); 
		}
		con.close();  	
	}
	catch(Exception e)
	{ 
		 System.err.println("Got an exception while saving in database!");
		 e.printStackTrace();
		 System.out.println(e); 
	}
	
	}
}

