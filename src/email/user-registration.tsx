import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

export const UserRegistrationTemplate = ({
  name,
  email,
  role,
  password,
  platformName,
  loginUrl,
}: {
  name: string;
  role: string;
  email: string;
  password: string;
  platformName: string;
  loginUrl: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Bem-vindo(a) à {platformName} — o seu cadastro foi concluído
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🎓 Cadastro concluído!</Heading>

          <Text style={text}>
            Olá, <strong>{name}</strong> 👋
          </Text>

          <Text style={text}>
            O seu cadastro na plataforma <strong>{platformName}</strong> como
            {role}
            {role} foi realizado com sucesso.
          </Text>

          <Text style={text}>Aqui estão as suas credenciais de acesso:</Text>

          <Section style={credentialsBox}>
            <Text style={credential}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={credential}>
              <strong>Senha:</strong> {password}
            </Text>
          </Section>

          <Text style={text}>
            Pode aceder à plataforma usando o link abaixo:
          </Text>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <a href={loginUrl} style={button}>
              Aceder à Plataforma
            </a>
          </Section>

          <Text style={textSmall}>
            Recomendamos que altere a sua senha após o primeiro login para maior
            segurança.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            © {new Date().getFullYear()} {platformName}. Todos os direitos
            reservados.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// 🎨 Estilos inline
const main = {
  backgroundColor: "#f5f7fa",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
  margin: "30px auto",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "520px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const heading = {
  fontSize: "22px",
  fontWeight: "600",
  textAlign: "center" as const,
  color: "#222",
};

const text = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#444",
  marginBottom: "16px",
};

const textSmall = {
  fontSize: "13px",
  lineHeight: "1.6",
  color: "#666",
  marginBottom: "16px",
  textAlign: "center" as const,
};

const credentialsBox = {
  backgroundColor: "#f1f5f9",
  padding: "16px",
  borderRadius: "6px",
  margin: "20px 0",
};

const credential = {
  fontSize: "15px",
  color: "#333",
  marginBottom: "6px",
};

const button = {
  backgroundColor: "#2563eb",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "16px",
  textDecoration: "none",
  display: "inline-block",
};

const hr = {
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
};
