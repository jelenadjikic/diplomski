package diplomski.model;
import lombok.Data;

import java.io.Serializable;

@Data
public class Submission implements Serializable {

 	private Integer id;
    private String authorName;
    private String title;
    private String text; 
    private Integer price; 
    private String location;
    private String contactNumber;
    private String email;
    private String link;
    private Integer likes; 
    private Integer dislikes;
    private String datePublished;
  
    public Submission()
	{
	}
    
	public Submission(Integer id, String authorName, String title, String text, Integer price, String location, String contactNumber, String email, String link, Integer likes, Integer dislikes,String datePublished)
	{
		this.id=id;
		this.authorName=authorName;
		this.title=title;
		this.text=text;
		this.price=price;
		this.location=location;
		this.contactNumber=contactNumber;
		this.email=email;
		this.link=link;
		this.likes=likes;
		this.dislikes=dislikes;
		this.datePublished=datePublished;
	}
	// ID
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	// Author name
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	// Title
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	// Text
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	// Price
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}
	// Likes
	public Integer getLikes() {
		return likes;
	}
	public void setLikes(Integer likes) {
		this.likes = likes;
	}
	//Dislikes
	public Integer getDislikes() {
		return dislikes;
	}
	public void setDislikes(Integer dislikes) {
		this.dislikes = dislikes;
	}
	//Link
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	//Location
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}

	//Contact number
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	//Email
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	//Date Published
	public String getDatePublished() {
		return datePublished;
	}
	public void setDatePublished(String datePublished) {
		this.datePublished = datePublished;
	}

}