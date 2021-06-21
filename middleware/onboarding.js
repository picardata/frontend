export default function ({ store, redirect, route }) {
  const user = store.state.auth.user
  const callbackPage = route.path.includes('/apps/callback')

  if (user.onboardingStatus < 21 && !callbackPage) {
    return redirect('/onboarding')
  }
}
