import React from "react";
class Material extends React.Component {
    
    render() {
        console.log(this.props.data)
        // const keys = [...new Set([].concat.apply([], this.props.data.map(obj => Object.keys(obj))))]
        // console.log(keys)
        let f = ''
        for (let i = 0, j = 0; i < this.props.data.length && j < 10; i++, j++) {

            const kee = Object.keys(this.props.data[i])
            console.log(kee)
            f = kee
        }
        return (
                <table
                    cellspacing="0"
                    cellpadding="0"
                    style={{
                        margin: "20px",
                        display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    tableLayout: 'fixed',
                        whiteSpace: 'normal',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 0px 40px 0px rgba(0, 0, 0, 0.15)',
                        fontSize: '15px',
                        color: '#808080',
                    
                }}>
                    <thead>
                        <tr
                            style={{

                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                backgroundColor: '#6c7ae0',
                            boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)',
                            color: 'white'



                        }}
                        >
                            {f.map((k) => {
                                console.log(f.length)
                                
                                return (
                                    <th
                                        style={{
                                            width:`${100/f.length}%`,
                                            padding: "15px",
                                        }}>{k}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody class="Tbody">
                        {
                            this.props.data.map((d) => {
                                const values = []
                                f.forEach(key => {
                                    
                                    if (typeof d[key] === 'object' || typeof d[key] === 'undefined') {

                                        d[key] = '----------'

                                    } else if (d[key] === true) {
                                        d[key] = "true"
                                    } else if (d[key] === false) {
                                        d[key] = 'false'
                                    } else if (d[key].length < 1) {
                                        d[key] = '----------'
                                    } 
                                    
                                    
                                    values.push(d[key])

                                })
                                console.log(values)
                                // values.map(str => {
                                //     if (typeof str === "object") {
                                //         let st = JSON.stringify(str)
                                //         values[1] = st;
                                //     } else if (typeof str === Boolean) {
                                //         return str.toString()

                                //     }
                                //})
                                return (
                                    <tr
                                        class="Tr-body"
                                        style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        
                                        }}>
                                        
                                        {values.map((di) => {
                                            return (
                                                
                                                <td
                                                    style={{
                                                    width: `${100 / f.length}%`,
                                                        wordWrap: 'break-word',
                                                        padding: '10px 0',
                                                        
                                                }}
                                            
                                                >
                                                    
                                                    {di}
                                                    </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        }
                        
                
                    </tbody>
                </table>
        );

    }
}



export default Material
