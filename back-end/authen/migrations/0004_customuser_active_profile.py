# Generated by Django 4.2.7 on 2023-12-07 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authen', '0003_kitchenuser_delivery_alter_kitchenuser_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='active_profile',
            field=models.BooleanField(default=False),
        ),
    ]
