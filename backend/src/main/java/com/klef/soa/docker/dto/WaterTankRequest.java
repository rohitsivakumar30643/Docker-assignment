package com.klef.soa.docker.dto;

public class WaterTankRequest {

    private String tankcode;
    private int capacityLitres;
    private String material;
    private String installedDate;


    public String getTankcode() {
        return tankcode;
    }

    public void setTankcode(String tankcode) {
        this.tankcode = tankcode;
    }

    public int getCapacityLitres() {
        return capacityLitres;
    }

    public void setCapacityLitres(int capacityLitres) {
        this.capacityLitres = capacityLitres;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getInstalledDate() {
        return installedDate;
    }

    public void setInstalledDate(String installedDate) {
        this.installedDate = installedDate;
    }
}
