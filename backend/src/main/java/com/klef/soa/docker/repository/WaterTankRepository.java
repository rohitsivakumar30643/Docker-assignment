package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.soa.docker.entity.WaterTank;

public interface WaterTankRepository extends JpaRepository<WaterTank,Long>
{

}
