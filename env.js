const fs = require('fs');

var region = process.argv[2];
if (region == 'staging1' || 'staging2' || 'staging3' || 'staging4' || 'staging5') {
    var envData = `
    REGION=${region}
    API_URL=https://hasura-${region}.raisetech.io/v1/graphql
    APP_URL=https://${region}-app.raisetech.io/auth/login
    OPS_URL=https://${region}-ops.raisetech.io/auth/login
    PG_USER=readonlyhasura
    PG_PASSWORD=Readrole${region}
    PG_HOST=platform-${region}.cxaa9uvbmjwk.ap-south-1.rds.amazonaws.com`;
    fs.writeFileSync('.env', envData);
} else if (region == 'beta') {
    var envData = `
    REGION=${region}
    API_URL=https://hasura-${region}.raisetech.io/v1/graphql
    APP_URL=https://${region}-app.raisetech.io/
    OPS_URL=https://${region}-ops.raisetech.io/auth/login
    PG_USER=readonlyhasura
    PG_PASSWORD=pwd42pointohbeta
    PG_HOST=platform-${region}.cwzheuy6rpmh.eu-west-2.rds.amazonaws.com`;
    fs.writeFileSync('.env', envData);
} else if (region == 'prod') {
    var envData = `
    REGION=${region}
    API_URL=
    APP_URL=https://app.raisetech.io
    OPS_URL=https://ops.raisetech.io
    PG_USER=
    PG_PASSWORD= 
    PG_HOST=`;
    fs.writeFileSync('.env', envData);
}
console.log('environment variables has been set!');
