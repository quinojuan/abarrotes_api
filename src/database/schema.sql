CREATE TABLE `Productos` (
  `codigo_de_barras` varchar(255) PRIMARY KEY,
  `como_se_vende` varchar(255),
  `descripcion` varchar(255),
  `precio_costo` integer,
  `precio_venta` integer,
  `precio_mayor` integer,
  `departamento` varchar(255),
  `utiliza_inventario` boolean,
  `cantidad_actual` integer,
  `minimo` integer
);

