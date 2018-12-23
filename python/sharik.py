import pygame
import random


class Ball:
    x = 0
    y = 0
    dx = 0
    dy = 0


pygame.init()
size = (800, 600)
screen = pygame.display.set_mode(size)
clock = pygame.time.Clock()

done = False

ball_img = pygame.image.load('png/ball.png')
rocky_left = pygame.image.load('png/rocky_left.png') 
rocky_right = pygame.image.load('png/rocky_right.png')

boy_size = (50, 100)
ball_size = (16, 16)

ball_img = pygame.transform.scale(ball_img, ball_size)
rocky_left = pygame.transform.scale(rocky_left, boy_size)
rocky_right = pygame.transform.scale(rocky_right, boy_size)

x = 200
y = 300
speed = 0
vertical_speed = -30
gravity = 2
smortim = "napravo"

balls = []

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                ball = Ball()
                ball.x = x + 25
                ball.y = y + 50
                ball.dy = -20
                if smortim == "napravo":
                    ball.dx = 15
                else:
                    ball.dx = -15
                balls.append(ball)

            if event.key == pygame.K_UP:
                vertical_speed = -30
            if event.key == pygame.K_LEFT:
                smortim = "nalevo"
                speed = -10
            if event.key == pygame.K_RIGHT:
                smortim = "napravo"
                speed = 10
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                speed = 0
            if event.key == pygame.K_RIGHT:
                speed = 0

    screen.fill((100,255,255))

    vertical_speed = vertical_speed + gravity
    if vertical_speed > 20:
        vertical_speed = 20

    x = x + speed
    y = y + vertical_speed

    if y > 500:
        y = 500

    for ball in balls:
        ball.dy = ball.dy + gravity
        if ball.dy > 50:
            ball.dy = 50
        ball.x = ball.x + ball.dx
        ball.y = ball.y + ball.dy
        if ball.y > 600-16:
            ball.y = 600-16
            ball.dy = -ball.dy * 0.8
            if abs(ball.dy) < 1:
                balls.remove(ball)
        if ball.x < 0:
            ball.x = 0
            ball.dx = -ball.dx
        if ball.x > 784:
            ball.x = 784
            ball.dx = -ball.dx
    #pygame.draw.rect(screen, (25, 224, 10), [
    #    player1.x, player1.y, player1.width, player1.height
    #], 0)

    if smortim == "napravo":
        screen.blit(rocky_right, (x, y)) # <---- BOY
    else:
        screen.blit(rocky_left, (x, y))  # <---- BOY

    for ball in balls:
        screen.blit(ball_img, (ball.x, ball.y))

    pygame.display.flip()
    clock.tick(20)
pygame.quit()
