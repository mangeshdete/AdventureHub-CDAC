package com.example.adventureHub.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name="securityquestions")
public class SecurityQuestion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int qid;
	String question;
	
	public SecurityQuestion() {
		super();
	}
	
	public SecurityQuestion(int qid, String question) {
		super();
		this.qid = qid;
		this.question = question;
		
	}
	public int getQid() {
		return qid;
	}
	public void setQid(int qid) {
		this.qid = qid;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}

}
