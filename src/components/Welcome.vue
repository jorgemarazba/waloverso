<template>
  <div class="welcome-container">
    <div class="welcome-hero">
      <h1>¡Bienvenidos!</h1>
    </div>

    <div class="welcome-content">
      <div class="welcome-intro">
        <p class="intro-text">
          Bienvenido al waloverso Calamardo! 🤙
        </p>
        <p>
          Ahora formas parte del gremio de chill 🤙.
        </p>
        <p>
          Estamos teniendo problemas con la administración así que decidí llevar a cabo un poco mejor la vuelta aqui...
        </p>
        <p>
          Necesito un control sobre los miembros y támbien busco voluntarios para administrarlo así que háganmelo saber.
        </p>
        <p>
          Y aquí les explicare algunos comentarios de lo que tengo planeado:
        </p>
      </div>

      <div class="rules-section">
        <div class="rule">
          <h3>⚔️ Purga</h3>
          <p>
            No duren mas de 30 días sin conectarse o serán acreedores a la P U R G A, esto con fines de tener siempre espacio para reclutar, de no ser posible que se conecten avisen por discord para evitar este terrible acontecimiento.
          </p>
        </div>

        <div class="rule">
          <h3>↩️ Reingreso</h3>
          <p>
            Si llegas a ser expulsado por inactividad siempre puedes volver, no te preocupes, no es una falta grave, no se te retirara el rol de gremio a menos que tu te lo quites para no ver estos canales.
          </p>
        </div>

        <div class="rule">
          <h3>🏆 Obtener más rango</h3>
          <p>
            Cada mes (por ahora) y por Premios Wálicos mensuales podrás obtener un rango superior a los demás, el cual tendrá cada ves mas requsiiitos (exquiisiiiiiitos) para permanecer con el, como son: días de inactividad o puntos y algunos mas (WIP osea en español trabajando en esto).
          </p>
        </div>
      </div>

      <div class="register-section">
        <h2>📝 Deja tú información en este post para ganar tu primer rango:</h2>
        <ol class="register-list">
          <li><strong>Designa un personaje principal:</strong> NOMBRE.</li>
          <li><strong>Apodo Ankama:</strong> Tu usuario de Ankama con discriminador.</li>
          <li><strong>Nombre de tus personajes secundarios:</strong> Tus alts.</li>
          <li><strong>Nombre de tu Twitch:</strong> Si no tienes, pues te haces uno 🙂.</li>
          <li><strong>Quien te invitó al gremio:</strong> Nombre del miembro que te invitó.</li>
        </ol>
        <p class="register-footer">
          Gracias por ingresar ya tendrás tu rol en lo que un ALTO MANDO ingresa al canal. ✨
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
}

.welcome-hero {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideDown 0.6s ease-out;
}

.welcome-hero h1 {
  font-size: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 800;
}

.welcome-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.6s ease-out 0.2s backwards;
}

.welcome-intro {
  margin-bottom: 2rem;
  line-height: 1.8;
}

.intro-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 1rem;
}

.welcome-intro p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
}

.rules-section {
  margin: 2rem 0;
  display: grid;
  gap: 1.5rem;
}

.rule {
  border-left: 4px solid #667eea;
  padding-left: 1.5rem;
  padding-bottom: 1rem;
}

.rule h3 {
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.rule p {
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.register-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
}

.register-section h2 {
  color: #667eea;
  margin-top: 0;
  font-size: 1.3rem;
}

.register-list {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  line-height: 2;
  color: #333;
}

.register-list li {
  margin-bottom: 0.8rem;
}

.register-footer {
  text-align: center;
  color: #764ba2;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .welcome-hero h1 {
    font-size: 2.5rem;
  }

  .welcome-content {
    padding: 1.5rem;
  }

  .intro-text {
    font-size: 1.1rem;
  }

  .register-section {
    padding: 1.5rem;
  }
}
</style>
