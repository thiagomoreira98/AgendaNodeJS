CREATE OR REPLACE FUNCTION CONTATO.LISTARUSUARIO (
	idUsuario INTEGER 
) RETURNS TABLE(
	"id" CONTATO.AGENDA.ID%TYPE,
	"nome" CONTATO.AGENDA.NOME%TYPE,
	"dataNascimente" CONTATO.AGENDA.DATANASCIMENTO%TYPE,
	"sexo" CONTATO.AGENDA.sexo%TYPE	
) AS $$ 


BEGIN
	RETURN  QUERY 
		SELECT 
			a.id,
			a.nome,
			a.dataNascimento,
			a.sexo
		FROM CONTATO.AGENDA a 
		WHERE 
			CASE WHEN idUsuario IS NULL THEN 
				TRUE 
			ELSE 
				a.ID = idUsuario 
			END;
END;

$$
LANGUAGE plpgsql;
SELECT * FROM CONTATO.LISTARUSUARIO(1);


CREATE OR REPLACE FUNCTION CONTATO.INSERTUSER(
		pNome CONTATO.AGENDA.NOME%TYPE,
		pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
		pSexo CONTATO.AGENDA.SEXO%TYPE
) RETURNS JSON AS $$
DECLARE
	vReturnError VARCHAR(1000);
BEGIN 
	IF EXISTS(SELECT NOME FROM CONTATO.AGENDA a WHERE a.NOME = pNome) THEN 
		RETURN '{"result": "Este nome ja existe na agenda", "code": 2, "httpCode": 409}';
	END IF;
	
	INSERT INTO CONTATO.AGENDA(
		NOME,
		DATANASCIMENTO,
		SEXO
	) VALUES  (
		pNome,
		pDataNascimento,
		pSexo
	);

	RETURN '{"result": "Contato inserido com sucesso", "code": 0, "httpCode": 200}';

	EXCEPTION WHEN OTHERS THEN
		GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
		RETURN '{"result": ' || to_json(vRetrunError)|| ', "code": 3, "httpCode": 500}'; 
END;
$$
LANGUAGE plpgsql;
SELECT * FROM CONTATO.INSERTUSER('Wagnerr', '1991-10-30', 'M');