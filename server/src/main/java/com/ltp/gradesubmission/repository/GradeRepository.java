package com.ltp.gradesubmission.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ltp.gradesubmission.entity.Course;
import com.ltp.gradesubmission.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {

      Optional<Grade> findByStudentIdAndCourseId(Long studentId,Long courseId);
       void deleteByStudentIdAndCourseId(Long studentId,Long courseId);
     List<Grade> findByStudentId(Long studentId);
     List<Grade> findByCourseId(Long courseId);



}