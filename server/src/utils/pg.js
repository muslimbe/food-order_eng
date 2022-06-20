const { Pool } = require('pg')
// const { connectionString, connectionStringOnline } = require('../config/pool')

const pool = new Pool({
  connectionString: 'postgres://pvebeoxf:DbEsmsvtHlGrro53oGvb7yPtR6wIHtjh@kashin.db.elephantsql.com/pvebeoxf'
})

const fetch = async (SQL, values) => {

   const val = typeof values == 'object'

   const client = await pool.connect()

   try{
      const {rows} = await client.query(SQL, val ? [...values] : [values])
      return rows

   }catch(error){
      throw error

   }finally{
      await client.release()
   }
}

const fetchAll = async (SQL) => {
   const client = await pool.connect()

   try{
      const {rows} = await client.query(SQL)
      return rows

   }catch(error){
      throw error

   }finally{
      await client.release()
   }
}

module.exports = {
   fetch,
   fetchAll
}