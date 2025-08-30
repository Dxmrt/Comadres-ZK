// Minimal stub for SIWE during hackathon.
// Replace later with real SIWE flow if needed.
export const useSiwe = () => {
  const signIn = async () => true;
  const signOut = async () => true;
  return { signIn, signOut };
};