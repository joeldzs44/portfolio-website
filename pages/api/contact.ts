import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const formObj = req.body;

            // This is not a private API key, so don't grill me on this.
            formObj['access_key'] = "f6beecb2-fa65-451b-a06d-31714f132f31"

            if (!formObj.name || !formObj.email || !formObj.message) {
                return res.status(400).json({ error: 'Missing required fields' });
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
                return res.status(200).json({ message: 'Form submitted successfully' });
            }
            else {
                return res.status(500).json({ error: 'Something went wrong while hitting the Web3Forms API' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}