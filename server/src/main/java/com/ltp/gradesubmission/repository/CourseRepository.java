package com.ltp.gradesubmission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.ltp.gradesubmission.entity.Course;


public interface CourseRepository extends JpaRepository<Course,Long> {

}