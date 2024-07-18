package com.ltp.gradesubmission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.ltp.gradesubmission.entity.Student;


public interface StudentRepository extends JpaRepository<Student, Long> {

}