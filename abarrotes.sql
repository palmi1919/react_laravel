CREATE TABLE persona (
    pk_persona SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(25) NOT NULL,
    apaterno VARCHAR(20) NOT NULL,
    amaterno VARCHAR(20),
    fecha_nac DATE NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    estatus CHAR(1)
);

CREATE TABLE rol_empleado (
    pk_rol_empleado SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(20) NOT NULL,
    estatus CHAR(1)
);

CREATE TABLE empleado (
    pk_empleado SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_persona SMALLINT NOT NULL,
    fk_rol_empleado SMALLINT NOT NULL,
    estatus CHAR(1),

    FOREIGN KEY (fk_persona) REFERENCES persona(pk_persona),
    FOREIGN KEY (fk_rol_empleado) REFERENCES rol_empleado(pk_rol_empleado)
);

CREATE TABLE usuario (
    pk_usuario SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_empleado SMALLINT NOT NULL,
    usuario VARCHAR(30) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    estatus CHAR(1),

    FOREIGN KEY (fk_empleado) REFERENCES empleado(pk_empleado)
);

CREATE TABLE categoria_pro (
    pk_categoria_pro SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_cat VARCHAR(20) NOT NULL,
    estatus CHAR(1)
);

CREATE TABLE producto (
    pk_producto SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom_producto VARCHAR(20) NOT NULL,
    fk_categoria_pro SMALLINT NOT NULL,
    stock INT NOT NULL,
    fecha_caducidad DATE NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estatus CHAR(1),

    FOREIGN KEY (fk_categoria_pro) REFERENCES categoria_pro(pk_categoria_pro)
);

CREATE TABLE imagen_producto (
    pk_imagen_producto SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_producto SMALLINT NOT NULL,
    ruta_imagen VARCHAR(255) NOT NULL,
    estatus CHAR(1),

    FOREIGN KEY (fk_producto) REFERENCES producto(pk_producto)
);