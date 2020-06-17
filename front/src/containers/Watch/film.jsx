import React from "react";
import api from "../../api/api";


export default function Film() {
    api.get('/movie/all')
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })

    return (
        <div>
            blalamldlafdlalfal
        </div>
    )
} 