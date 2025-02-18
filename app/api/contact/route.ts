import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formObj = await request.json();

        // This is not a private API key, so don't grill me on this.
        formObj['access_key'] = "f6beecb2-fa65-451b-a06d-31714f132f31"

        if (!formObj.name || !formObj.email || !formObj.message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formObj)
        });

        const result = await response.json();
        if (result.success) {
            console.log(result);
            return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
        }
        else {
            return NextResponse.json({ error: 'Something went wrong while hitting the Web3Forms API' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 