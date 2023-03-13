package com.codetoyou.businessapi.rest.product;

import com.codetoyou.businessapi.rest.product.model.Product;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductRequest {

  private Long id;
  private String descr;
  private String name;
  private BigDecimal price;
  private String sku;

  @JsonFormat(pattern = "dd/MM/yyyy") //formato da data
  private LocalDate createdAt;

  public ProductRequest() {
    super();
  } //construtor vazio

  public ProductRequest(
    Long id,
    String descr,
    String name,
    BigDecimal price,
    String sku
  )  {//construtor com todos os atributos
    super();
    this.id = id;
    this.descr = descr;
    this.name = name;
    this.price = price;
    this.sku = sku;
  } //construtor sem o atributo createdAt
 
  public ProductRequest(
    Long id,
    String descr,
    String name,
    BigDecimal price,
    String sku,
    LocalDate createdAt
  ) {
    this.id = id;
    this.descr = descr;
    this.name = name;
    this.price = price;
    this.sku = sku;
    this.createdAt = createdAt;
  }

  public Product toModel() {
    return new Product(id, name, price, descr, sku, createdAt);
  } //construtor com todos os atributos

  public static ProductRequest fromModel(Product product) {
    return new ProductRequest(
      product.getId(),
      product.getDescr(),
      product.getName(),
      product.getPrice(),
      product.getSku(),
      product.getCreatedAt()
    );
  } //construtor sem o atributo id e createdAt 
  
  public String getDescr() {
    return descr;
  }

  public void setDescr(String descr) {
    this.descr = descr;
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

  public String getSku() {
    return sku;
  }

  public void setSku(String sku) {
    this.sku = sku;
  }

  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public LocalDate getCreatedAt() {
    return createdAt;
  }
  
  public void setCreatedAt(LocalDate createdAt) {
    this.createdAt = createdAt;
  }

  @Override
  public String toString() {
    return "ProductRequest [id=" + id + ", descr=" + descr + ", name=" + name + ", price=" + price + ", sku=" + sku
        + ", createdAt=" + createdAt + "]";
  }

 

}
