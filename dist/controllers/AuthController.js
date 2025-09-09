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
    async login(req, res) {
        const dto = req.body;
        try {
            const user = await this.userService.validate(dto.email, dto.password);
            if (user) {
                res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
            }
            else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
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
