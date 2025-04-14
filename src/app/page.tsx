'use client'

import { Box, Flex, Heading, Text, Blockquote, Card, Separator } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: '600px',
        background: 'linear-gradient(to right,rgb(233, 223, 91),rgb(62, 67, 32),rgb(128, 126, 58))',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Card
        style={{
          maxWidth: 700,
          padding: '2rem',
          backgroundColor: '#ffffff0d',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid #ffffff22',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Heading size="8" weight="bold" mb="2" color="yellow">
          Star Wars Project
        </Heading>
        <Text size="4" color="gray">
          Teste Técnico para Desenvolvedor Frontend – Weslley Bastos
        </Text>

        <Separator my="4" size="4" />

        <Blockquote size="5" color="gray">
          Gostaria de agradecer pela oportunidade de realizar este teste técnico
          para o time do Mercado Livre. Foi um desafio bastante
          motivador, no qual pude explorar conceitos modernos de frontend,
          acessibilidade e componentes reusáveis.

          <br /><br />
          ⚠️ Vale ressaltar que, durante a execução do projeto, a API apresentou instabilidades
          que impactaram a visualização completa dos dados em alguns momentos. Ainda assim,
          todos os esforços foram feitos para garantir a melhor experiência possível dentro
          do prazo proposto.
        </Blockquote>
      </Card>
    </Flex>
  );
}
