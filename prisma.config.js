// This file forces Prisma to use the correct configuration
// Specifically targets the P6001 error in Vercel deployments

module.exports = {
  generator: {
    provider: "prisma-client-js",
    binaryTargets: ["native", "debian-openssl-1.1.x", "rhel-openssl-3.0.x"],
    engineType: "binary"
  }
}
