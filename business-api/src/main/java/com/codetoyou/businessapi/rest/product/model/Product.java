package com.codetoyou.businessapi.rest.product.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;



@Entity //indica que é uma entidade
@Table(name = "products") //nome da tabela
public class Product {

    
    @Id //indica que é uma chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY ) //indica que é auto incremento
    private Long id; //nome da coluna
    
    @Column(name = "name", length = 100) //indica que é uma coluna e o tamanho máximo
    private String name; 

    @Column(name = "price" , precision = 16, scale = 2)
    private BigDecimal price;

    @Column(name = "descr" , length = 255)
    private String descr;

    @Column(name = "sku" , length = 20)
    private String sku;
    
    @Column(name = "createdAt", updatable = false )
    private LocalDate createdAt;

    public Product(Long id, String name, BigDecimal price, String descr, String sku, LocalDate createdAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.descr = descr;
        this.sku = sku;
        this.createdAt = createdAt;
    } //construtor com todos os atributos

    public Product(Long id, String name, BigDecimal price, String descr, String sku) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.descr = descr;
        this.sku = sku;
    } //construtor sem o atributo createdAt
    
    public Product(String name, BigDecimal price, String descr, String sku) {
        this.name = name;
        this.price = price;
        this.descr = descr;
        this.sku = sku;
    } //construtor sem o atributo id e createdAt
    
    public Product() {
        super();
    } //construtor vazio

    @PrePersist //indica que o método será executado antes de persistir
    public void prePersist() {
       setCreatedAt(LocalDate.now());
    }


    public Long getId() { 
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    
        public LocalDate getCreatedAt() {
            return createdAt;
        }
    
        public void setCreatedAt(LocalDate createdAt) {
            this.createdAt = createdAt;
        }
        
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", price=" + price + ", descr=" + descr + ", sku=" + sku + "]";
    }

    



}
