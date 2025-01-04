package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.adventureHub.entity.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Integer> {

//	@Query("select * from users where email=?1 , password=?2")
	@Query("from User where email=?1 and password=?2")
	public User login(String email, String password);
	
	public User findUserByEmail(String emailid);
	
	@Query(value="select u.securityqans from users u where u.email=:email",nativeQuery = true)
	public String findSecurityqansByEmail(String email);
	
	@Modifying
	@Transactional
	@Query(value="update users set password=:password where email=:email", nativeQuery = true)
	public int updateUserPassword(String email, String password);
}
