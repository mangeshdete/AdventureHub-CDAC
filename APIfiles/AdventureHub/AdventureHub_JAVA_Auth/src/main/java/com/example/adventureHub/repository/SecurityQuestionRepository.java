package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.adventureHub.entity.SecurityQuestion;

public interface SecurityQuestionRepository extends JpaRepository<SecurityQuestion, Integer> {

	@Query(value = "select q.qid, q.question from securityquestions q join users u on u.securityqid=q.qid where u.userid=:userid", nativeQuery = true)
	public SecurityQuestion getSecurityQuestionByUsers(int userid);
}
