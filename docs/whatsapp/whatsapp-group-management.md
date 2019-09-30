---
title: "Group Management"
excerpt: "Manage your WhatsApp groups and their admins. Learn how to add or remove members of the different groups. Read more..."
---
A collection of endpoints used to manage groups that are linked to a specific bot.

## Create a new group

This endpoint allows for the creation of a group.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json
- Set the group subject for a group

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>subject
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            Group subject as a string.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>group_id <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The identifier of the group</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**Path Parameters**

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">bot-id
            <span class="req-red">required</span>
          </td>
          <td align="left"><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**POST**

```text
/whatsapp/v1/{bot-id}/groups
```

**Payload**

```json
{
  "subject": "Sinch WhatsApp Team Group"
}
```

### Response samples

#### 200

```json
{
  "group_id": "group:447506616260-1565342732"
}
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [to] can not be empty."
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## List all groups associated with your bot


With this endpoint you get a response with the groups that are associated with your bot.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

## Responses

**200 Expected result to a valid request**
*Response schema: application/json*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>groups <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of strings</span> <br> Array of group ids that are associated to the given bot.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*  

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">bot-id <br> <span class="req-red">required</span></td>
          <td align="left">string <br> <span class="type-grey">The identifier of the bot that wishes to send messages.</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request

**GET**

```text
/whatsapp/v1/{bot-id}/groups
```

### Response samples

#### 201

```json
{
  "groups": [
    "group:447506616260-1565342732"
  ]
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## List all information associated with the specified group id

When you need more information about a specified group id, this endpoint returns this information. See the **200** response below to read more about the response.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>admins <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of string</span> <br> Array containing all admins of the group.</td>
        </tr>
        <tr class="row-even">
          <td>creation_time <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Creation time of the group.</td>
        </tr>
        <tr class="row-odd">
          <td>creator <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Number of the creator of the group</td>
        </tr>
        <tr class="row-even">
          <td>members <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of string</span> <br> Array containing all members of the group.</td>
        </tr>
        <tr class="row-odd">
          <td>subject <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Subject of the group</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*  

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request

**GET**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}
```

### Response samples

#### 200

```json
{
  "admins": [
    "0732000000",
    "0732001122"
  ],
  "creator": "0732000000",
  "members": [
    "0732001122"
  ],
  "subject": "Sinch WhatsApp Group",
  "creation_time": "2019-08-09T09:25:32.000Z"
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Update a groups subject

By using this endpoint the group subject can be changed for a given bot id and group id.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json

- Group subject

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>subject
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            Group subject as a string.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**PATCH**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}
```

**Payload**

```json
{
  "subject": "Sinch WhatsApp Team Group"
}
```

### Response samples

#### 200

```json
<empty>
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [subject] can not be empty"
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Leave a specified group

When you wish to leave a specified group this is the endpoint that should be used.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
          The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request

**DELETE**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}
```

### Response samples

#### 200

```json
<empty>
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Remove group members

With this endpoint, one ore more members of a specified group can be removed from that group.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json

- List of group members to be removed.

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>numbers
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of strings</span>
            Array of phone numbers (msisdns).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**DELETE**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}/member
```

**Payload**

```json
{
  "numbers": [
    "0732001122",
    "0732002244",
    "0732003366"
  ]
}
```

### Response samples

#### 200

```text
<empty>
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [subject] can not be empty"
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Add admins to the specified group

For a given group id you can add one or more admins.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json

- List of admins to be added to the group.

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>numbers
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of strings</span>
            Array of phone numbers (msisdns).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**POST**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}/admin
```

**Payload**

```json
{
  "numbers": [
    "0732001122",
    "0732002244",
    "0732003366"
  ]
}
```

### Response samples

#### 200

```text
<empty>
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [subject] can not be empty"
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Remove admins from the specified group

Use this endpoint to remove one or more admins of a specific group.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json

- List of admins to be removed from the group.

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>numbers
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of strings</span>
            Array of phone numbers (msisdns).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**DELETE**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}/admin
```

**Payload**

```json
{
  "numbers": [
    "0732001122",
    "0732002244",
    "0732003366"
  ]
}
```

### Response samples

#### 200

```text
<empty>
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [subject] can not be empty"
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Grab a valid group invite link to the specified group

Get a invitation link to the specific group. Use it to send invite members to the group.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |


*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request

**GET**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}/invite
```

### Response samples

#### 200

```text
<empty>
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```

## Delete the active group invite link

If you have created a invitation link, it can be revoked with this endpoint.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

### Responses

**200 Expected result to a valid request**
*Response schema: application/json*

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
        <tr class="row-even">
          <td>group-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the group.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request

**DELETE**

```text
/whatsapp/v1/{bot-id}/groups/{group-id}/invite
```

### Response samples

#### 200

```text
<empty>
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```
