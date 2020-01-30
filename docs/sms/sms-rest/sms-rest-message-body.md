---
title: Message Body
excerpt: ''
hidden: 'true'
next:
  pages:
    - sms-rest-parameterization
  description: Learn about the statuses and codes that tells the state of an SMS batch
---
When specifying the message body in the request, the characters used as well as the length of the message affect how many actual SMS messages are sent out. When using [parameterization](doc:sms-rest-parameterization), the length of each message may also vary depending on the recipient-specific data.

### Supported Characters

Individual characters used in the message determine the type of encoding that will ultimately be used to send the SMS message. The API automatically detects the encoding required from the characters used, which allows us to support the delivery of SMS in any language.

#### Basic Character Set

You can send up to 160 characters in a single SMS message if all characters in your message are part of the GSM 7-bit character set:

|      |       |      |     |     |     |     |       |
|-- -  | ---   | ---  | --- | --- | --- | --- | --- --|
| @    | Δ     | `SP` | 0   | ¡   | P   | ¿   | p     |
| £    | _     | !    | 1   | A   | Q   | a   | q     |
| $    | Φ     | "    | 2   | B   | R   | b   | r     |
| ¥    | Γ     | #    | 3   | C   | S   | c   | s     |
| è    | Λ     | ¤    | 4   | D   | T   | d   | t     |
| é    | Ω     | %    | 5   | E   | U   | e   | u     |
| ù    | Π     | &    | 6   | F   | V   | f   | v     |
| ì    | Ψ     | '    | 7   | G   | W   | g   | w     |
| ò    | Σ     | (    | 8   | H   | X   | h   | x     |
| Ç    | Θ     | )    | 9   | I   | Y   | i   | y     |
| `LF` | Ξ     | *    | :   | J   | Z   | j   | z     |
| Ø    | `ESC` | +    | ;   | K   | Ä   | k   | ä     |
| ø    | Æ     | ,    | <   | L   | Ö   | l   | ö     |
| `CR` | æ     | -    | =   | M   | Ñ   | m   | ñ     |
| Å    | ß     | .    | >   | N   | Ü   | n   | ü     |
| å    | É     | /    | ?   | O   | §   | o   | à     |

`LF` is the Line Feed character - for JSON format, provide it as `\n`
`SP` is the Space character

#### Extended Character Set

The following characters are also available, but they are counted as two characters in the SMS message rather than one:

`|` , `^` , `€` , `{` , `}` , `[` , `]` , `~` , `\`

#### Other Characters

If other characters are required for different languages, 16-bit Unicode (UCS-2) encoding will be used. When using UCS-2 encoding, each character will take 2 bytes, which means up to 70 characters can be sent per UCS-2 encoded SMS message.

### Long Messages

The message body in a request can contain up to 1600 characters. Longer messages will be split and sent as multiple distinct SMS messages. In most cases, those messages will be re-assembled on the handset and displayed to the end-user as a single long message. You can use the tables below to determine the actual number of SMS messages your message will use depending on its length and encoding.

#### Using only 7-bit Characters

| Message Length | Number of SMS Parts |
|-- -            | ---               --|
| 1 - 160        | 1                   |
| 161 - 306      | 2                   |
| 307 - 459      | 3                   |
| 460 - 612      | 4                   |
| 613 - 765      | 5                   |
| 766 - 918      | 6                   |
| 919 - 1061     | 7                   |
| 1062 - 1214    | 8                   |
| 1215 - 1367    | 9                   |
| 1368 - 1520    | 10                  |
| 1521 - 1600    | 11                  |

Each SMS in a multi-part 7-bit encoded message, has a maximum length of 153 characters.

#### Using Unicode Characters

| Message Length | Number of SMS Parts |
|-- -            | ---               --|
| 1 - 70         | 1                   |
| 71 - 134       | 2                   |
| 134 - 201      | 3                   |
| 202 - 268      | 4                   |
| 269 - 335      | 5                   |
| 336 - 402      | 6                   |
| 403 - 469      | 7                   |
| 470 - 538      | 8                   |
| 539 - 605      | 9                   |
| 606 - 672      | 10                  |
| 673 - 739      | 11                  |
| 740 - 796      | 12                  |
| 797 - 853      | 13                  |
| 854 - 924      | 14                  |
| 925 - 991      | 15                  |
| 992 - 1058     | 16                  |
| 1059 - 1115    | 17                  |
| 1116 - 1182    | 18                  |
| 1183 - 1249    | 19                  |
| 1250 - 1316    | 20                  |
| 1317 - 1383    | 21                  |
| 1384 - 1450    | 22                  |
| 1451 - 1517    | 23                  |
| 1518 - 1584    | 24                  |
| 1585 - 1600    | 25                  |

Each SMS in a multi-part Unicode encoded message, has a maximum length of 67
characters.
