 export default (value) => {
    const date = new Date(value)
     return date.toLocaleString(['se-SE'], {month: 'short', day: '2-digit', year: 'numeric'})
 }