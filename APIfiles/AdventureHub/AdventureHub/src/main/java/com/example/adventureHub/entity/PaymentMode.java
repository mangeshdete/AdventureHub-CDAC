package com.example.adventureHub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="paymentmode")
public class PaymentMode {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int paymentmodeid;
	String paymentmodename;
	public PaymentMode() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaymentMode(int paymentmodeid, String paymentmodename) {
		super();
		this.paymentmodeid = paymentmodeid;
		this.paymentmodename = paymentmodename;
	}
	public int getPaymentmodeid() {
		return paymentmodeid;
	}
	public void setPaymentmodeid(int paymentmodeid) {
		this.paymentmodeid = paymentmodeid;
	}
	public String getPaymentmodename() {
		return paymentmodename;
	}
	public void setPaymentmodename(String paymentmodename) {
		this.paymentmodename = paymentmodename;
	}
}
