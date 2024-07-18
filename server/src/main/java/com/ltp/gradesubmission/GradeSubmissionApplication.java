package com.ltp.gradesubmission;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ltp.gradesubmission.entity.Course;
import com.ltp.gradesubmission.repository.CourseRepository;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
public class GradeSubmissionApplication  {

    @Autowired
    CourseRepository courseRepository;

    public static void main(String[] args) {
        SpringApplication.run(GradeSubmissionApplication.class, args);
    }


}
