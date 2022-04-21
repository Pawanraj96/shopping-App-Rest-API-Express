// npm i winston
const {createLogger,transports,format}=require('winston')

const logger = createLogger({
    transports:[
        new transports.File(
            {
                filename:'data'
            }
        )
    ]
})