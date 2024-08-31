from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user_auth.views import RegisterView, LoginView, UserInfoView, ExerciseViewSet, WorkoutPlanView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/userInfo/', UserInfoView.as_view(), name='userInfo'),
    path('api/', include(router.urls)),
    path('workoutplan/<str:username>/', WorkoutPlanView.as_view(), name='workout_plan'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)