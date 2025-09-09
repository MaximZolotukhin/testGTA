export class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(req, res) {
        const dto = req.body;
        try {
            const user = await this.userService.create(dto);
            res.status(201).json({ message: 'User created successfully', user });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
