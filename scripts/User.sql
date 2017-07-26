CREATE OR REPLACE FUNCTION CONTATO.INSERTUSERFULL(
  pNome CONTATO.AGENDA.NOME%TYPE,
  pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
  pSexo CONTATO.AGENDA.SEXO%TYPE,
  pTelefone JSON,
  pEndereco JSON
) RETURNS JSON AS $$

DECLARE
  vReturnError VARCHAR(1000);
  vReturningId INTEGER;
BEGIN
  IF EXISTS(SELECT NOME FROM CONTATO.AGENDA a WHERE a.nome = pNome)THEN
    RETURN '{"result": "Este nome já existe na agenda", "code": 2, "httpCode": 409}';
  END IF;

  INSERT INTO CONTATO.AGENDA(
    NOME,
    DATANASCIMENTO,
    SEXO
  ) VALUES (
    pNome,
    pDataNascimento,
    pSexo
  ) RETURNING ID INTO vReturningId;

  -- INSERTS DE TELEFONE

  INSERT INTO CONTATO.TELEFONE(
    IDAGENDA,
    DDD,
    TELEFONE,
    WHATS
  )
    SELECT
      vReturningId,
      "ddd",
      "telefone",
      "whats"
    FROM json_to_recordset(pTelefone)
      AS x("ddd" INTEGER, "telefone" VARCHAR, "whats" CHAR(1));

  -- INSERTS DE ENDERECO

  INSERT INTO CONTATO.ENDERECO(
    IDAGENDA,
    RUA,
    NUMERO,
    BAIRRO,
    CEP
  )
    SELECT
      vReturningId,
      "rua",
      "numero",
      "bairro",
      "cep"
    FROM json_to_recordset(pEndereco)
      AS x("rua" VARCHAR(50), "numero" VARCHAR(8), "bairro" VARCHAR(20), "cep" VARCHAR(9));

  RETURN '{"result": "Contato inserido com sucesso!", "code": 0, "httpCode": 200}';

  EXCEPTION WHEN OTHERS THEN
  GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
  RETURN '{"result": ' || to_json(vReturnError) || ', "code": 3, "httpCode": 500}';

END;

$$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.INSERTUSERFULL(
    'JSON COMPLETAO',
    '1995-12-25',
    'M',
    '[{"ddd": 16, "telefone": "993144257", "whats":"S"}]',
    '[{"rua": "ABC", "numero": "45B", "bairro":"Centro", "cep":"14400-650"}]'
)

CREATE OR REPLACE FUNCTION CONTATO.LISTUSER(
  idUsuario INTEGER
) RETURNS TABLE(
  "id" CONTATO.AGENDA.ID%TYPE,
  "nome" CONTATO.AGENDA.NOME%TYPE,
  "datanascimento" CONTATO.AGENDA.DATANASCIMENTO%TYPE,
  "sexo" CONTATO.AGENDA.SEXO%TYPE,
  "telefones" JSON,
  "enderecos" JSON
) AS $$

BEGIN
  RETURN QUERY
  SELECT
    a.ID,
    a.NOME,
    a.DATANASCIMENTO,
    a.SEXO,
    (SELECT JSON_AGG(telefoness) FROM (SELECT * FROM CONTATO.TELEFONE t WHERE t.idAgenda = a.id) telefoness) AS telefones,
    (SELECT JSON_AGG(enderecoss) FROM (SELECT * FROM CONTATO.ENDERECO e WHERE e.idAgenda = a.id) enderecoss) AS enderecos
  FROM CONTATO.AGENDA a
  WHERE
    CASE WHEN idUsuario IS NULL THEN
      TRUE
    ELSE
      a.id = idUsuario
    END
  ORDER BY
    a.nome;
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.LISTUSER(15);
