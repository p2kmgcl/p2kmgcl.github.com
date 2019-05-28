const showSplashScreenMessage = (message: string) => {
  const splashScreen = document.getElementById('splash-screen');

  if (splashScreen) {
    splashScreen.classList.remove('hidden');

    const messageElement =
      splashScreen.querySelector('.message') ||
      (function() {
        const newMessage = document.createElement('p');
        newMessage.classList.add('message');
        splashScreen.appendChild(newMessage);
        return newMessage;
      })();

    messageElement.innerHTML = message;
  }
};

export { showSplashScreenMessage };
