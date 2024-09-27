
DROP FUNCTION requiresLens;

DELIMITER //
CREATE FUNCTION requiresLens(prod_id CHAR(36)) RETURNS VARCHAR(5)
DETERMINISTIC BEGIN
RETURN IF (  EXISTS(SELECT product_type FROM products WHERE id=prod_id AND product_type="GLASSES")     ,"TRUE", "FALSE");
END //
DELIMITER ;

SELECT requiresLens("4bdeee9f-7530-11ee-bab4-f889d2b5c633");