import {
    Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
  } from 'sequelize-typescript';
  
  @Table
  export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;
  
    @Column
    company: string;

    @Column
    description: string;

    @Column
    quantity: string;

    @Column
    brand: string;
    
    @Column
    value: string;
  }