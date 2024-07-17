
![GitHub last commit](https://img.shields.io/github/last-commit/Williamluqui/webhookMercadoPago)

| Parâmetro   | Tipo       |
| :---------- | :--------- | 
| `NODE`| ` ^20.9.0` | 
| `MERCADOPAGO` | `^2.0.9` | 


# WebHook Mercado pago

## Em desenvolvimento 🚧

Integração com o mercado pago, esse webhook tem a funcão de tratar algumas informações vindas do gateway de pagamento e para esse desenvolvimento estou utilizando de um sdk disponível

Mais informações você pode encontrar no github oficial: https://github.com/mercadopago 
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`

`SECRET_SIGNATURE`

`ACCESS_TOKEN`


## Documentação da API

#### Aguarda o retorno do gateway de pagamento

```http
  POST /api/notifications
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `PORT | `string` | **Obrigatório**. Porta da aplicação. |
| `SECRET_SIGNATURE` | `string` | **Obrigatório**. Chave do Webhook(Assinatura secreta) |
| `ACCESS_TOKEN` | `string` | **Obrigatório**. Credênciais de teste (TEST-) |

### Recebemos dois tipos de notificações:
Pagamento
```http
<URL-MERCADOPAGO>data.id=1317977074&source_news=webhook&type=payment
```
Pedido
```http
<URL-MERCADOPAGO>id=18035506355&source_news=webhook&topic=merchant_order
```
Obs.: Resolvi tratar as duas respostas mas apenas a de pagamento será utilizada.
```bash
Pagamento
{
    "data": {
        "id": 999999,
        "idExternal": "99999",
        "status": "approved",
        "paymentType": "credit_card",
        "statusDatails": "accredited",
        "serviceName": " <NOME DO SERVIÇO> ",
        "value": <VALOR-DO-PRODUTO>,
        "dateApproved": "2022-04-26T14:26:40.562-04:00",
        "dateCreated": "2022-04-26T14:26:40.379-04:00"
    }
}

As informações que iremos utilizar são as de status e id.
```

```bash
Pedido
{
    "data": {
        "id": 18035506355,
        "status": "opened",
        "cancelled": false,
        "referenceId": "REF=3c4ca801"
    }
}
```
#### Rota de envio das informações para o middleware

```http
  POST/api/send-notifications
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `X-API-KEY`      | `string` | Chave da api que irá receber as informações.|




## Deploy

### Docker

Para fazer o deploy desse projeto use o comando.


```bash
$ docker-compose up
```

### Node 

```bash
$ npm install
```
## Referência

 - [Documentacão Mercado Pago](https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post)
 - [GitHub Mercado pago](https://github.com/mercadopago)
 


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wluqui/)


