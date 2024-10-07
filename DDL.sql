CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable the UUID extension

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    google_id VARCHAR(255) UNIQUE NOT NULL,         
    email VARCHAR(255) UNIQUE NOT NULL,              
    display_name VARCHAR(255),                   
    profile_picture VARCHAR(255),                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

ALTER TABLE users
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE; 

select * from users u 



-- all products 

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    created_by UUID,
    stock INT DEFAULT 0,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    CONSTRAINT fk_user
        FOREIGN KEY (created_by) 
        REFERENCES users(id)
        ON DELETE CASCADE
);


select * from products p 


CREATE TABLE carts (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),            
    user_id UUID REFERENCES users(id),  
    product_id UUID REFERENCES products(id), 
    quantity INTEGER NOT NULL,        
    total_price NUMERIC(10, 2) NOT NULL,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


select * from carts c 

SELECT * FROM carts c
          INNER JOIN products p on p.id = c.product_id 
           WHERE user_id = '031f8241-46ee-421e-a999-86c723f3789d'
           
           
           
           
           
--address TABLE 
           
CREATE TABLE addresses (
    address_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),              
    user_id UUID,                       
    street VARCHAR(255) NOT NULL,              
    city VARCHAR(100) NOT NULL,                
    state VARCHAR(100) NOT NULL,               
    postal_code VARCHAR(20) NOT NULL,         
    country VARCHAR(100) NOT NULL,              
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

-- Orders table 

CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),              
    user_id UUID not null,                       
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    total_amount DECIMAL(10, 2) NOT NULL,      
    order_status VARCHAR(50) DEFAULT 'pending',
    shipping_address_id UUID not null,                    
    billing_address_id UUID not null,                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (shipping_address_id) REFERENCES addresses(address_id) ON DELETE SET NULL, 
    FOREIGN KEY (billing_address_id) REFERENCES addresses(address_id) ON DELETE SET NULL 
);

-- Order Items table 

CREATE TABLE order_products_mapping (
    order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),          
    order_id UUID not null,                    
    product_id UUID not null,                    
    quantity INT NOT NULL,                       
    price DECIMAL(10, 2) NOT NULL,              
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
ALTER TABLE order_items RENAME TO order_products_mapping;
SELECT * FROM products

select * from carts c 

SELECT * FROM products p
            where p.id = '4df4af64-e015-4537-9207-945e1d1a047a'
select * from addresses a 

select * from order_products_mapping opm 


select * from orders o 

select * from addresses a 

ALTER TABLE addresses
ADD phone varchar(255);

select * from users u 
select * from users u where id = '031f8241-46ee-421e-a999-86c723f3789d'

select * from carts c where product_id  = '99138f27-e862-4b25-b692-24435428aa69'

select * from products p 
SELECT * FROM users


SELECT * FROM products
            LIMIT 5 OFFSET 1
            
            
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),          
    order_id UUID not null,
    user_id UUID not null,
    payment_mode VARCHAR (255),                    
    payment_receipt_attachement VARCHAR (255),
	total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

select * from orders o 


select *  from payments 

select * from order_products_mapping opm where order_id = '238c1383-eda4-4721-8af0-c36c7ac51eba'


select * from payments p
inner join order_products_mapping opm 
on opm.order_id = p.order_id
inner join products p2
on p2.id = opm.product_id 

select * from users u 
 


    select * from payments p 
    select * from products p 
    
    
ALTER TABLE table_name
ADD column_name datatype;



select image from products p where p.id = '4df4af64-e015-4537-9207-945e1d1a047a'

select * from carts c 



ALTER TABLE products 
ADD is_removed boolean default false;


ALTER TABLE orders  
ADD is_cancelled boolean default false;



ALTER TABLE order_products_mapping 
ADD note text ;

ALTER TABLE carts  
ADD note text;

ALTER TABLE carts 
ADD invisible boolean default false;


ALTER TABLE users 
ADD password varchar (255);



CREATE TABLE order_request (
    order_request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    cake_size VARCHAR(100) NOT NULL,
    cake_type VARCHAR(100) NOT NULL,
    order_date TIMESTAMP NOT NULL,
    order_sample TEXT,
    message TEXT
);

-- DB CHANGES
-- MAKE NOT NULL CONSTRAINT FALSE FOR google_id




 