package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Tanks_Table")
public class WaterTank 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	public String tankcode;
	public int capacityLitres;
	public String material;
	public String installedDate;
	public long getId() {
		return id;
	}
	public String getTankcode() {
		return tankcode;
	}
	public int getCapacityLitres() {
		return capacityLitres;
	}
	public String getMaterial() {
		return material;
	}
	public String getInstalledDate() {
		return installedDate;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setTankcode(String tankcode) {
		this.tankcode = tankcode;
	}
	public void setCapacityLitres(int capacityLitres) {
		this.capacityLitres = capacityLitres;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public void setInstalledDate(String installedDate) {
		this.installedDate = installedDate;
	}
	@Override
	public String toString() {
		return "WaterTank [id=" + id + ", tankcode=" + tankcode + ", capacityLitres=" + capacityLitres + ", material="
				+ material + ", installedDate=" + installedDate + "]";
	}
}
