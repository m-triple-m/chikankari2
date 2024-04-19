import { NextResponse } from "next/server"

const getBackendData = async (url) => {
    const res = await fetch(url, {
        
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export async function middleware(req, res) {
    // return NextResponse.redirect(new URL('/', req.url))
    console.log(req.url);
    // return NextResponse.redirect(new URL('/home', request.url))
    // next();
    const ApiResponse = await fetch('http://localhost:5000/get-permission', {
        headers: {
            'x-auth-token': 'admin2'
        }
    });
    const data = await ApiResponse.json();
    if(false){
        return NextResponse.redirect(new URL('/authenticate', req.url));
    }else{
        return NextResponse.next();
    }
        // .then((data) => {
        //     const url = req.nextUrl.clone()
        //     console.log(url);
        //     url.pathname = '/authenticate'
        //     if(data.allowed){
        //         return NextResponse.next();
        //     }else{
        //     }
        // });
}

export const config = {
    matcher: '/admin/manageproduct'
}