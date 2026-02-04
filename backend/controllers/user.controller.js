export const getProfile = async (req, res) => {
    res.json(req.user);
};

export const updateProfile = async (req, res) => {
    const { name } = req.body;
    if (name) req.user.name = name;
    await req.user.save();
    res.json(req.user);
};
