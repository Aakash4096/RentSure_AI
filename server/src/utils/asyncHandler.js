const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
/**
 * Wraps async route handlers to automatically catch errors
 * and pass them to Express error middleware
 *
 * WITHOUT asyncHandler:
 * app.get('/users', async (req, res, next) => {
 *   try {
 *     const users = await User.find();
 *     res.json(users);
 *   } catch (error) {
 *     next(error);  // This line is repeated EVERYWHERE
 *   }
 * });
 *
 * WITH asyncHandler:
 * app.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
