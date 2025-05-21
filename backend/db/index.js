const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIULu0JVGarX3YwsiVoHPm3BPPLTIYwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1NGRjNmU5ZmUtNTYyMS00YjdmLTk4YmItMDY1MmQ5NDJh
MzA2IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNTIxMjEyMzI0WhcNMzUwNTE5MjEy
MzI0WjBAMT4wPAYDVQQDDDU0ZGM2ZTlmZS01NjIxLTRiN2YtOThiYi0wNjUyZDk0
MmEzMDYgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBANYk7SHllu80XuGtmJeW8BmWManaB87lwjgy6kSB2e9OpRj3hF1xSRnv
b+PdlkIYEt4dzNwZtATuUDde4V8Tj/Slp/2DCjmiGbBjtHsLtdo8p5RHvD3m6SAn
su+gbMKsNgzaJ8W91J+U/EngOY7tacpbAVlWXWCdxqMTsraak2RfqVagKb2g/l/0
JUEVvlDuGTNxp7PCVt3CDwjFoBwT+1ela7eEXzm6D6iDx9fwBndjT8vEEc0iLk+Z
R3RoVEYObZXijfjiYAhzeZQR2SM94cRxzve/RnJ8fe1uqkDG4J9YP6TMoK8wh61r
x+pvp76b7SYYAlRDCJp8+T4u4YbFW0r231uzVvHIoxyVOrcLEjRhuQa9YmObPTZN
/KSce7KHz5mDMWtmhYNs5RF9u1ETaYno4hWBUvQpT0Cdr/U0s0j6DrXbuTxUOK2q
ZiuGLy6ot76qz4kTKkyH51HrIPWkuNvyMXnyNDiuONFvyhGXfCxqDvdihchiQnb/
sBMeUer2FQIDAQABoz8wPTAdBgNVHQ4EFgQUMz/9CrMRs75h0baqm1BDUYz4N+Iw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AJheZgzsibtHoP1O6GxLBZDFtbOUkwmnBh/dXK47Xnt2KnawrbnlESC9LbWRlHin
aJJzDSbzULrUIU82oPXJRrn3ykDvBkWBsSitbJCh607xfN2TCmst4PDDp1hNoG39
1PvHvuGDC+HoZI4AYSl4Fpz+3m5uSSepbFnJbhSjnQKb6qbEwq+aXmmwrLB5DkY0
J2v0UvLjiqNve4HLimhIt/p3jnG7ETsC5lf6XQXK5zb3eDXYMBpIX9uQN/j4md/o
xUrqs8UGM/z7LLDE9IkUDLAjiwuarS8JLHLF/y3iV2ToNCp8rBbf7uw83wq4ffl/
v2AUjKold+E0AG8aaxi2mNZzVMlJRKNsLKVP7dK3PR2WaJA93W+F5Zb/AOM1ySbP
QuW44KLw25Tdd5Qt0G0ZopwyHa/CiOodPGg8ZpFegOVUh11rafaQDtoRvWgPMoT6
l5gA625o2OjKbwU71gW7HDu1cxCxceLnkNwmnfPWhMniqUMmRH0+LNrz+iF6iXcs
8g==
-----END CERTIFICATE-----
`,
  },
};

const client = new Client(config);

client.connect()
  .then(() => console.log('Connected to PostgreSQL with SSL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
